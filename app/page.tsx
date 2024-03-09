"use client";

import { useState } from "react";
import { InfoToolTip } from "./InfoTooltip.component";
import { useRouter } from "next/navigation";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";

interface Spectrum {
  id: string;
  initialLambda: number | undefined;
  finalLambda: number | undefined;
  deltaLambda: number | undefined;
  age: number;
  imfSlope: number | undefined;
  imfType: string;
  resolution: number | undefined;
  nms: number;
  nrg: number;
  loggcn: number;
  abundances: Array<number>;
}

const romanNumber: Array<string> = ["I", "II", "III", "IV", "V", "VI", "VII"];

const emailSchema = Joi.string().email({ tlds: { allow: false } });

export default function Home() {
  const [email, setEmail] = useState("");
  const [initialLambda, setInitialLambda] = useState<number | undefined>(
    "" as unknown as number
  );
  const [finalLambda, setFinalLambda] = useState<number | undefined>(
    "" as unknown as number
  );
  const [deltaLambda, setDeltaLambda] = useState<number | undefined>(
    "" as unknown as number
  );
  const [age, setAge] = useState<number>(0);
  const [imfSlope, setImfSlope] = useState<number | undefined>(
    "" as unknown as number
  );
  const [imfType, setImfType] = useState("");
  const [resolution, setResolution] = useState<number | undefined>(
    "" as unknown as number
  );
  const [nms, setNms] = useState<number>(9);
  const [nrg, setNrg] = useState<number>(6);
  const [loggcn, setLoggcn] = useState<number>(3);
  const [spectra, setSpectra] = useState<Array<Spectrum>>([]);

  const router = useRouter();

  const elements = [
    "[Fe/H]",
    "[alpha/Fe]",
    "[C/Fe]",
    "[N/Fe]",
    "[O/Fe]",
    "[Mg/Fe]",
    "[Si/Fe]",
    "[Ca/Fe]",
    "[Ti/Fe]",
    "[Na/Fe]",
    "[Al/Fe]",
    "[Ba/Fe]",
    "[Eu/Fe]",
    "[C/Fe]_rgb",
    "[N/Fe]_rgb",
  ];

  const [abundances, setAbundances] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [selectedSpectrum, setSelectedSpectrum] = useState<
    string | undefined
  >();

  const isEmailValid = emailSchema.validate(email).error === undefined;

  const valuesAreValid =
    !isNaN(initialLambda as number) &&
    initialLambda !== ("" as unknown as number) &&
    !isNaN(finalLambda as number) &&
    finalLambda !== ("" as unknown as number) &&
    !isNaN(deltaLambda as number) &&
    deltaLambda !== ("" as unknown as number) &&
    age !== 0 &&
    ((imfType !== "Unimodal" && imfType !== "") ||
      (!isNaN(imfSlope as number) && imfSlope !== ("" as unknown as number))) &&
    !isNaN(resolution as number) &&
    resolution !== ("" as unknown as number);

  function loadSpectrum(spectrum: Spectrum) {
    setSelectedSpectrum(spectrum.id);
    setInitialLambda(spectrum.initialLambda);
    setFinalLambda(spectrum.finalLambda);
    setDeltaLambda(spectrum.deltaLambda);
    setAge(spectrum.age);
    setImfType(spectrum.imfType);
    setImfSlope(spectrum.imfSlope);
    setResolution(spectrum.resolution);
    setNms(spectrum.nms);
    setNrg(spectrum.nrg);
    setLoggcn(spectrum.loggcn);
    setAbundances(spectrum.abundances);
  }

  function addSpectrum(resetData: boolean) {
    const spectrum: Spectrum = {
      id: uuidv4(),
      initialLambda,
      finalLambda,
      deltaLambda,
      age,
      imfSlope,
      imfType,
      resolution,
      nms,
      nrg,
      loggcn,
      abundances,
    };

    if (resetData) {
      setInitialLambda("" as unknown as number);
      setFinalLambda("" as unknown as number);
      setDeltaLambda("" as unknown as number);
      setAge(0);
      setImfSlope("" as unknown as number);
      setImfType("");
      setResolution("" as unknown as number);
      setNms(9);
      setNrg(6);
      setLoggcn(3);
      setAbundances([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setSelectedSpectrum(() => undefined);
    } else {
      setSelectedSpectrum(spectrum.id);
    }

    if (selectedSpectrum && resetData) {
      const spectrumIndex = spectra.findIndex(
        (spec) => spec.id === selectedSpectrum
      );

      const newSpectra = [...spectra];
      newSpectra[spectrumIndex] = spectrum;

      setSpectra(newSpectra);
    } else {
      setSpectra([...spectra, spectrum]);
    }
  }

  return (
    <main className="flex min-h-screen py-10 w-full">
      <div className="w-1/4 flex flex-col pl-20 gap-4">
        {spectra.map((spectrum, index) => (
          // <div key="spectra" className="flex items-center justify-between">
          //   <button className=" w-full bg-fuchsia-950 rounded-full px-1 py-4 text-center font-bold hover:shadow-lg hover:shadow-fuchsia-700 transition-shadow duration-500 ease-in-out">
          //     {`Spectrum ${romanNumber[index]}`}
          //   </button>
          //   <svg
          //     xmlns="http://www.w3.org/2000/svg"
          //     viewBox="0 0 20 20"
          //     fill="currentColor"
          //     className="w-6 h-6 self-start"
          //   >
          //     <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          //   </svg>
          // </div>
          <div key={index} className="relative w-full">
            <span
              className="absolute -right-3 cursor-pointer"
              title="Delete Spectrum"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-6 h-6 hover:animate-spin"
                onClick={() => {
                  spectra.splice(index, 1);
                  setSpectra([...spectra]);
                }}
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </span>
            <button
              className={`w-full bg-fuchsia-950 rounded-full px-1 py-4 text-center font-bold transition-shadow duration-500 ease-in-out ${
                spectrum.id === selectedSpectrum
                  ? "shadow-lg shadow-fuchsia-700"
                  : ""
              }`}
              onClick={() => loadSpectrum(spectrum)}
            >
              {`Spectrum ${romanNumber[index]}`}
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 flex-col items-center w-1/2 px-24 ">
        <input
          className="w-full mb-4 bg-indigo-900 rounded-full px-4 py-4 placeholder:text-white placeholder:text-center text-center placeholder:font-bold"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="w-full flex gap-3 justify-center">
          <input
            className="input-pretty w-full"
            placeholder="λ Initial (Å)"
            type="number"
            min={3500}
            max={9999}
            step={0.1}
            value={initialLambda}
            onChange={(event) =>
              setInitialLambda(parseFloat(event.target.value))
            }
          />
          <input
            className="input-pretty w-full"
            placeholder="λ Final (Å)"
            type="number"
            min={3501}
            max={10000}
            step={0.1}
            value={finalLambda}
            onChange={(event) => setFinalLambda(parseFloat(event.target.value))}
          />
        </div>
        <InfoToolTip information="Delta Lambda">
          <input
            className="input-pretty w-full"
            placeholder="Δλ (Å/pix)"
            type="number"
            value={deltaLambda}
            onChange={(event) => setDeltaLambda(parseFloat(event.target.value))}
          />
        </InfoToolTip>
        <InfoToolTip information="The ages go from 8 Gyrs to 14 Gyrs">
          <select
            className="input-pretty w-full font-bold"
            value={age}
            onChange={(event) => setAge(parseInt(event.target.value))}
          >
            <option value={0} disabled>
              Age (Gyrs)
            </option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
          </select>
        </InfoToolTip>
        <select
          className="input-pretty w-full font-bold"
          value={imfType}
          onChange={(event) => setImfType(event.target.value)}
        >
          <option value={""} disabled>
            IMF Type
          </option>
          <option value={"Kroupa"}>Kroupa</option>
          <option value={"Salpeter"}>Salpeter</option>
          <option value={"Unimodal"}>Unimodal</option>
        </select>
        {imfType === "Unimodal" && (
          <InfoToolTip information="Add the IMF Slope the values go from 1 to 7">
            <input
              className="input-pretty w-full"
              placeholder="IMF Slope"
              type="number"
              value={imfSlope}
              min={0.3}
              max={7.0}
              step={0.1}
              onChange={(event) =>
                setImfSlope(
                  Math.max(0.3, Math.min(7, parseFloat(event.target.value)))
                )
              }
            ></input>
          </InfoToolTip>
        )}
        <InfoToolTip information="Add the resolution in Å">
          <input
            className="input-pretty w-full"
            placeholder="Resolution (Å)"
            type="number"
            value={resolution}
            onChange={(event) => setResolution(parseFloat(event.target.value))}
          />
        </InfoToolTip>
        <InfoToolTip information="Add Info here">
          <div className="flex w-full items-center">
            <label className="shrink-0 mr-7">N MS</label>
            <input
              className="input-pretty w-full"
              placeholder="N MS"
              type="number"
              min={3}
              max={20}
              step={1}
              value={nms}
              onChange={(event) =>
                setNms(Math.max(3, Math.min(20, parseInt(event.target.value))))
              }
            />
          </div>
        </InfoToolTip>
        <InfoToolTip information="Add Info here">
          <div className="flex w-full items-center">
            <label className="shrink-0 mr-7">N RG</label>
            <input
              className="input-pretty w-full"
              placeholder="N RG"
              type="number"
              min={3}
              max={15}
              step={1}
              value={nrg}
              onChange={(event) =>
                setNrg(Math.max(3, Math.min(15, parseInt(event.target.value))))
              }
            />
          </div>
        </InfoToolTip>
        <InfoToolTip information="Add Info here">
          <div className="flex w-full items-center">
            <label className="shrink-0 mr-2">Logg CN</label>
            <input
              className="input-pretty w-full"
              placeholder="Logg CN"
              type="number"
              min={1}
              max={3}
              step={1}
              value={loggcn}
              onChange={(event) =>
                setLoggcn(
                  Math.max(1, Math.min(3, parseInt(event.target.value)))
                )
              }
            />
          </div>
        </InfoToolTip>
        <p>Elements and Abundances</p>
        <div className="flex flex-wrap">
          {elements.map((element, index) => (
            <div key={element}>
              <label className="mr-1">{element}:</label>
              <input
                className="placeholder:text-white bg-transparent w-12"
                value={abundances[index]}
                type="number"
                onChange={(event) =>
                  setAbundances(
                    abundances.with(index, parseFloat(event.target.value))
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className="w-full flex items-center mb-4 gap-2">
          <button className="input-pretty w-full font-bold ">
            Upload File
          </button>
          <span title="Download the example file" className="input-pretty px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        {spectra.length < 7 && valuesAreValid && (
          <div className="w-full flex gap-3 justify-center">
            <button
              className="w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold"
              title="Add a New Spectrum with the default values"
              onClick={() => addSpectrum(true)}
            >
              Save Spectrum
            </button>
            <button
              className=" w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold "
              title="Add a New Spectrum with the values of your current spectrum"
              onClick={() => addSpectrum(false)}
            >
              Copy Spectrum
            </button>
          </div>
        )}
        {spectra.length >= 1 && isEmailValid && (
          <button
            className="w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold"
            onClick={() => router.push("/spectrumsent")}
          >
            Send
          </button>
        )}
      </div>
    </main>
  );
}
