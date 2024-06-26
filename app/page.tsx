"use client";

import { useState } from "react";
import { InfoToolTip } from "./InfoTooltip.component";
import { InfoToolTip2 } from "./InfoTooltip2.component";
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
  abundances1: Array<number>;
  abundances2: Array<number>;
  abundances3: Array<number>;
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

  const elements1 = ["[Fe/H]", "[alpha/Fe]"];

  const elements2 = [
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
  ];

  const elements3 = ["[C/Fe]_rgb", "[N/Fe]_rgb"];

  const [abundances1, setAbundances1] = useState([0, 0]);

  const [abundances2, setAbundances2] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const [abundances3, setAbundances3] = useState([0, 0]);

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

  const isSendButtonActive = spectra.length >= 1 && isEmailValid;
  const isSendAndUpdateButtonActiveWithSpectrumSelected = spectra.length < 7 && valuesAreValid && selectedSpectrum
  const isSendAndUpdateButtonActiveWithoutSpectrumSelected = spectra.length < 7 && valuesAreValid && !selectedSpectrum 
  
  function defaultValues() {
    setInitialLambda(8000);
    setFinalLambda(9000);
    setDeltaLambda(0.1);
    setAge(12);
    setImfType("Salpeter");
    setImfSlope(undefined);
    setResolution(0.5);
    setNms(9);
    setNrg(6);
    setLoggcn(3);
    setAbundances1([0, 0]);
    setAbundances2([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setAbundances3([0, 0]);
  }

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
    setAbundances1(spectrum.abundances1);
    setAbundances2(spectrum.abundances2);
    setAbundances3(spectrum.abundances3);
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
      abundances1,
      abundances2,
      abundances3,
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
      setAbundances1([0, 0]);
      setAbundances2([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setAbundances3([0, 0]);
      setSelectedSpectrum(() => undefined);
    } else {
      setSelectedSpectrum(spectrum.id);
    }

    if (selectedSpectrum && resetData) {
      const spectrumIndex = spectra.findIndex(
        (spec) => spec.id === selectedSpectrum
      );

      if (spectrumIndex !== -1) {
        const newSpectra = [...spectra];
        newSpectra[spectrumIndex] = spectrum;

        setSpectra(newSpectra);
      } else {
        setSpectra([...spectra, spectrum]);
      }
    } else {
      setSpectra([...spectra, spectrum]);
    }
  }

  function sendSpectra() {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/synthetic-spectrum`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, spectra: spectra.map((spectrum) => ({
        ...spectrum,
        initialLambda: spectrum.initialLambda?.toString(),
        finalLambda: spectrum.finalLambda?.toString(),
        deltaLambda: spectrum.deltaLambda?.toString(),
        age: spectrum.age.toString(),
        imfSlope: spectrum.imfSlope?.toString(),
        resolution: spectrum.resolution?.toString(),
        nms: spectrum.nms.toString(),
        nrg: spectrum.nrg.toString(),
        loggcn: spectrum.loggcn.toString(),
        abundances1: spectrum.abundances1.map(String),
        abundances2: spectrum.abundances2.map(String),
        abundances3: spectrum.abundances3.map(String),
      })) }),
    }
    );

    router.push("/spectrumsent");
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
        <div className="w-full flex gap-7 justify-center">
          <div className="w-full flex items-center gap-0">
            <label className="shrink-0 mr-1">λ Initial (Å)</label>
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
          </div>
          <div className="w-full flex items-center gap-0">
            <label className="shrink-0 mr-1">λ Final (Å)</label>
            <input
              className="input-pretty w-full"
              placeholder="λ Final (Å)"
              type="number"
              min={3501}
              max={10000}
              step={0.1}
              value={finalLambda}
              onChange={(event) =>
                setFinalLambda(parseFloat(event.target.value))
              }
            />
          </div>
        </div>
        <InfoToolTip information="Sampling Delta lambda">
          <div className="w-full flex items-center gap-2">
            <label className="shrink-0 mr-1">Δλ (Å/pix)</label>
            <input
              className="input-pretty w-full"
              placeholder="Δλ (Å/pix)"
              type="number"
              value={deltaLambda}
              onChange={(event) =>
                setDeltaLambda(parseFloat(event.target.value))
              }
            />
          </div>
        </InfoToolTip>
        <InfoToolTip information="Age of the stellar population">
          <div className="w-full flex items-center gap-2">
            <label className="shrink-0 mr-1">Age (Gyrs)</label>
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
          </div>
        </InfoToolTip>
        <div className="w-full flex items-center gap-2">
          <label className="shrink-0 mr-1">IMF Type</label>
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
        </div>
        {imfType === "Unimodal" && (
          <InfoToolTip information="Add the IMF Slope the values go from 1 to 7">
            <div className="w-full flex items-center gap-2">
              <label className="shrink-0 mr-1">IMF Slope</label>
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
            </div>
          </InfoToolTip>
        )}
        <InfoToolTip information="Spectral resolution (FWHM)">
          <div className="w-full flex items-center gap-2 ">
            <label className="shrink-0 mr-1">Resolution (Å)</label>
            <input
              className="input-pretty w-full"
              placeholder="Resolution (Å)"
              type="number"
              value={resolution}
              onChange={(event) =>
                setResolution(parseFloat(event.target.value))
              }
            />
          </div>
        </InfoToolTip>
        <div className="w-full flex gap-7 justify-evenly items-center">
          <InfoToolTip2 information="Number of main sequence stars">
            <div className="flex gap-2 w-full items-center">
              <label>N MS</label>
              <input
                className="input-pretty px-1"
                placeholder="N MS"
                type="number"
                min={3}
                max={20}
                step={1}
                value={nms}
                onChange={(event) =>
                  setNms(
                    Math.max(3, Math.min(20, parseInt(event.target.value)))
                  )
                }
              />
            </div>
          </InfoToolTip2>
          <InfoToolTip2 information="Number of post-main sequence stars">
            <div className="flex w-full gap-2 items-center">
              <label>N RG</label>
              <input
                className="input-pretty px-1"
                placeholder="N RG"
                type="number"
                min={3}
                max={15}
                step={1}
                value={nrg}
                onChange={(event) =>
                  setNrg(
                    Math.max(3, Math.min(15, parseInt(event.target.value)))
                  )
                }
              />
            </div>
          </InfoToolTip2>
          <InfoToolTip2 information="Stellar surface gravity threshold for C and N enhancement (i.e., stars with logg < logg CN will have [C/Fe]_rgb, [N/Fe]_rgb)">
            <div className="flex w-full gap-2 items-center">
              <label>logg CN</label>
              <input
                className="input-pretty px-2"
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
          </InfoToolTip2>
        </div>
        <p>Elements and Abundances</p>
        <div className="flex flex-wrap">
          <div className="flex-col">
            {elements1.map((element1, index) => (
              <div key={element1}>
                <label className="mr-1">{element1}:</label>
                <input
                  className="placeholder:text-white bg-transparent w-12"
                  value={abundances1[index]}
                  type="number"
                  onChange={(event) =>
                    setAbundances1(
                      abundances1.with(index, parseFloat(event.target.value))
                    )
                  }
                />
              </div>
            ))}
          </div>
          <div>
            {elements2.map((element2, index) => (
              <div key={element2}>
                <label className="mr-1">{element2}:</label>
                <input
                  className="placeholder:text-white bg-transparent w-12"
                  value={abundances2[index]}
                  type="number"
                  onChange={(event) =>
                    setAbundances2(
                      abundances2.with(index, parseFloat(event.target.value))
                    )
                  }
                />
              </div>
            ))}
          </div>
          <div>
            {elements3.map((element3, index) => (
              <div key={element3}>
                <label className="mr-1">{element3}:</label>
                <input
                  className="placeholder:text-white bg-transparent w-12"
                  value={abundances3[index]}
                  type="number"
                  onChange={(event) =>
                    setAbundances3(
                      abundances3.with(index, parseFloat(event.target.value))
                    )
                  }
                />
              </div>
            ))}
          </div>
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

        {spectra.length < 7 && valuesAreValid && selectedSpectrum && (
          <div className="w-full flex gap-3 justify-center">
            <button
              className={`w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold ${isSendAndUpdateButtonActiveWithSpectrumSelected ? '' : 'opacity-50 cursor-not-allowed'}`}
              title="Add a New Spectrum with the default values"
              onClick={() => addSpectrum(true)}
              disabled={!isSendAndUpdateButtonActiveWithSpectrumSelected}
            >
              Update Selected Spectrum
            </button>
            <button
              className={`w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold ${isSendAndUpdateButtonActiveWithSpectrumSelected ? '' : 'opacity-50 cursor-not-allowed'}`}
              title="Add a New Spectrum with the values of your current spectrum"
              onClick={() => addSpectrum(false)}
              disabled={!isSendAndUpdateButtonActiveWithSpectrumSelected}
            >
              Save parameters as new Spectrum
            </button>
          </div>
        )} 

        {(spectra.length === 0 || spectra.length === 7) && (
          <div className="w-full flex gap-3 justify-center">
            <button
              className={`w-full rounded-full px-4 py-4 text-center font-bold ${isSendAndUpdateButtonActiveWithoutSpectrumSelected ? 'bg-indigo-900' : 'bg-indigo-900 opacity-50 cursor-not-allowed'}`}
              title="Add a New Spectrum with the values of your current spectrum"
              onClick={() => addSpectrum(false)}
              disabled={!isSendAndUpdateButtonActiveWithoutSpectrumSelected}
            >
              Save parameters as new Spectrum
            </button>
          </div>
        )}
          <button
            className={`w-full rounded-full px-4 py-4 text-center font-bold ${isSendButtonActive ? 'bg-indigo-900' : 'bg-indigo-900 opacity-50 cursor-not-allowed'}`}
            onClick={sendSpectra}
            disabled={!isSendButtonActive}
          >
            Send
          </button>
      </div>
      <div>
        <button
          className=" bg-purple-900 rounded-full py-4 px-10 text-white text-center font-bold hover:shadow-lg hover:shadow-fuchsia-700"
          onClick={() => defaultValues()}
        >
          Set Default Values
        </button>
      </div>
    </main>
  );
}
