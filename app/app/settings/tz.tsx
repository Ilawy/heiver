"use client";

import { type updateTimeZone as _updateTimeZone } from "@/lib/actions";
import FormWaiter from "@/lib/components/formwaiter";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useSetState } from "react-use";
import { Drawer } from "vaul";

const initialState = {
  currentOption: "device" as "device" | "location" | "manual",
  currentTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  loadedZones: false,
  zones: [] as string[],
  loading: false,
};


export default function Tz({
  updateTimeZone,
}: {
  updateTimeZone: typeof _updateTimeZone;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [state, setState] = useSetState(initialState);
  const [result, updateTimezoneAction] = useFormState(updateTimeZone, null);  


  useEffect(()=>{
   if(result !== null){
    if(result.ok){
      ref.current?.close();
    }else{
      alert(result.error)
    }
   }
    
  }, [result])

  useEffect(() => {        
    (async () => {
      if (state.currentOption === "device") {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } else if (state.currentOption === "location") {
        const tz = (await fetch("https://ipinfo.io/json").then((d) =>
          d.json()
        )).timezone;
        setState({
          currentTimezone: tz,
        });
      } else {
        if ("supportedValuesOf" in Intl) {
          setState({
            zones: Intl.supportedValuesOf("timeZone"),
            loadedZones: true,
          });
        } else {
          setState({
            loadedZones: true,
            zones: await fetch("/zones.json").then((d) => d.json()),
          });
        }
        return state.currentTimezone;
      }
    })();
    return () => {};
  }, [state.currentOption, state.currentTimezone]);


  return (
    <div className="my-3">
      <button onClick={() => ref.current?.showModal()}>Edit</button>
      <dialog
        className="native w-full max-w-sm md:max-w-lg p-3 border rounded-lg"
        ref={ref}
      >
        <h1>Change time zone</h1>
        <div className="select">
          <label>
            Device time zone
            <input
              checked={state.currentOption === "device"}
              onChange={(e) => setState({ currentOption: "device" })}
              type="radio"
              name="option"
              id=""
            />
          </label>
          <label>
            Current Location
            <input
              checked={state.currentOption === "location"}
              onChange={(e) => setState({ currentOption: "location" })}
              type="radio"
              name="option"
              id=""
            />
          </label>
          <label>
            Manual
            <input
              checked={state.currentOption === "manual"}
              onChange={(e) => setState({ currentOption: "manual" })}
              type="radio"
              name="option"
              id=""
            />
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <i className="my-3">You chose {state.currentTimezone}</i>
          <form className="flex gap-3 flex-wrap" action={updateTimezoneAction}>
            <FormWaiter setLoading={(l: boolean)=>setState({loading: l})} />
            <datalist id="zones">
              {state.zones.map((zone) => <option key={zone} value={zone} />)}
            </datalist>
            {state.currentOption === "manual"
              ? (
                <>
                  {state.loadedZones
                    ? (
                      <input
                        onChange={(e) =>
                          setState({ currentTimezone: e.target.value })}
                        list="zones"
                        type="text"
                        name="timezone"
                      />
                    )
                    : "loading..."}
                </>
              )
              : (
                <input
                  hidden
                  readOnly
                  type="text"
                  name="timezone"
                  id="timezone"
                  value={state.currentTimezone}
                />
              )}

            <button>{state.loading ? "..." : "Save"}</button>
            <button type="button" onClick={() =>{
              queueMicrotask(()=>setState(initialState))
              ref.current?.close();
            }}>Cancel</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
