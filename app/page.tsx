"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [initialLambda, setInitialLambda] = useState<number>();
  const [finalLambda, setFinalLambda] = useState<number>();
  const [deltaLambda, setDeltaLambda] = useState<number>();
  const [age, setAge] = useState<number>(0);
  const [imfSlope, setImfSlope] = useState<number>();
  const [imfType, setImfType] = useState("");
  const [resolution, setResolution] = useState<number>();

  const elements = ["H", "Li", "Be", "B", "C", "N", "O", "F"];
  const [abundances, setAbundances] = useState([
    10.93, 1.05, 1.38, 2.7, 8.55, 7.97, 8.77, 4.56,
  ]);

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
          className="input-pretty"
          placeholder="λ Initial (Å)"
          type="number"
          value={initialLambda}
          onChange={(event) => setInitialLambda(parseFloat(event.target.value))}
        />
        <input
          className="input-pretty"
          placeholder="λ Final (Å)"
          type="number"
          value={finalLambda}
          onChange={(event) => setFinalLambda(parseFloat(event.target.value))}
        />
      </div>
      <input
        className="input-pretty w-full"
        placeholder="Δλ (Å/pix)"
        type="number"
        value={deltaLambda}
        onChange={(event) => setDeltaLambda(parseFloat(event.target.value))}
      />
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
      <input
        className="input-pretty w-full"
        placeholder="IMF Slope"
        type="number"
        value={imfSlope}
        onChange={(event) => setImfSlope(parseFloat(event.target.value))}
      ></input>
      <select
        className="input-pretty w-full font-bold"
        value={imfType}
        onChange={(event) => setImfType(event.target.value)}
      >
        <option value={""} disabled>
          IMF Type
        </option>
        <option value={"bi"}>bi</option>
        <option value={"ch"}>ch</option>
        <option value={"kb"}>kb</option>
        <option value={"ku"}>ku</option>
        <option value={"un"}>un</option>
      </select>
      <input
        className="input-pretty w-full"
        placeholder="Resolution (Å)"
        type="number"
        value={resolution}
        onChange={(event) => setResolution(parseFloat(event.target.value))}
      />
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
      <button className="input-pretty w-full font-bold mb-4">Add File</button>
      <div className="w-full flex gap-3 justify-center">
        <button className="w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold ">
          Add Spectrum
        </button>
        <button className=" w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold ">
          Copy Spectrum
        </button>
      </div>
      <button className="w-full bg-indigo-900 rounded-full px-4 py-4 text-center font-bold">
        Send
      </button>
    </main>
  );
}
