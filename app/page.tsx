"use client";

import { useState } from "react";
import { InfoToolTip } from "./InfoTooltip.component";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [initialLambda, setInitialLambda] = useState<number>();
  const [finalLambda, setFinalLambda] = useState<number>();
  const [deltaLambda, setDeltaLambda] = useState<number>();
  const [age, setAge] = useState<number>(0);
  const [imfSlope, setImfSlope] = useState<number>();
  const [imfType, setImfType] = useState("");
  const [resolution, setResolution] = useState<number>();
  const [nms, setNms] = useState<number>(9);
  const [nrg, setNrg] = useState<number>(6);
  const [loggcn, setLoggcn] = useState<number>(3);

  const router = useRouter();

  const elements = [
    "[Fe/H], [alpha/Fe]",
    "[C/Fe], [N/Fe], [O/Fe], [Mg/Fe], [Si/Fe], [Ca/Fe], [Ti/Fe], [Na/Fe],[Al/Fe], [Ba/Fe], [Eu/Fe]",
    "[C/Fe]_rgb, [N/Fe]_rgb",
  ];
  const [abundances, setAbundances] = useState([0, 0, 0]);

  return (
    <main className="flex min-h-screen gap-3 flex-col items-center px-24 py-10 w-1/2 mx-auto">
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
          onChange={(event) => setInitialLambda(parseFloat(event.target.value))}
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
              setLoggcn(Math.max(1, Math.min(3, parseInt(event.target.value))))
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
        <button className="input-pretty w-full font-bold ">Upload File</button>
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

      <div className="w-full flex gap-3 justify-center">
        <button
          className="w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold"
          title="Add a New Spectrum with the default values"
        >
          New Spectrum
        </button>
        <button
          className=" w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold "
          title="Add a New Spectrum with the values of your previous spectrum"
        >
          Copy Spectrum Parameters
        </button>
      </div>
      <button
        className="w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold"
        onClick={() => router.push("/spectrumsent")}
      >
        Send
      </button>
    </main>
  );
}
