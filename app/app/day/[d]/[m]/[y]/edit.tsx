"use client";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { type submitDayData as _submitDayData } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";
import { DateTime } from "luxon";
function FormWaiter({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { action, data, pending } = useFormStatus();
  useEffect(() => {
    setLoading(pending);
  }, [pending]);
  return null;
}

export default function Edit({ submitDayData, date }: {
  submitDayData: typeof _submitDayData;
  date: {
    year: number;
    month: number;
    day: number;
  };
}) {
  const [loading, setLoading] = useState(false);
  const [state, action] = useFormState(submitDayData, null);
  const day = DateTime.fromObject(date);

  if (state === null) {
    return (
      <motion.main
        className="p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1>Edit your day</h1>
        <h2>{day.toLocaleString(DateTime.DATE_FULL)}</h2>
        <form action={action} id="form_main">
          <input hidden readOnly type="text" name="date" value={JSON.stringify(date)} />
          <FormWaiter setLoading={setLoading} />
        </form>

        {/* <h1>How {diff === 0 ? "is" : "was"} your day</h1> */}
        <section>
          <h2>
            <span className="char">R</span>eligion
          </h2>
          <div className="meter">
            <label className="switch-label bad">
              1
              <input
                required
                form="form_main"
                name="religion"
                value={1}
                type="radio"
              />
            </label>
            <label className="switch-label mod">
              2
              <input form="form_main" name="religion" value={2} type="radio" />
            </label>
            <label className="switch-label good">
              3
              <input form="form_main" name="religion" value={3} type="radio" />
            </label>
            <label className="switch-label good">
              4
              <input form="form_main" name="religion" value={4} type="radio" />
            </label>
            <label className="switch-label great">
              5
              <input form="form_main" name="religion" value={5} type="radio" />
            </label>
            <span className="text-lg">
            </span>
          </div>
        </section>
        <section>
          <h2>
            <span className="char">L</span>ife
          </h2>
          <div className="meter">
            <label className="switch-label bad">
              1
              <input
                required
                form="form_main"
                name="life"
                value={1}
                type="radio"
              />
            </label>
            <label className="switch-label mod">
              2
              <input form="form_main" name="life" value={2} type="radio" />
            </label>
            <label className="switch-label good">
              3
              <input form="form_main" name="life" value={3} type="radio" />
            </label>
            <label className="switch-label good">
              4
              <input form="form_main" name="life" value={4} type="radio" />
            </label>
            <label className="switch-label great">
              5
              <input form="form_main" name="life" value={5} type="radio" />
            </label>
            <span className="text-lg">
            </span>
          </div>
        </section>
        <section>
          <h2>
            <span className="char">H</span>ealth
          </h2>
          <div className="meter">
            <label className="switch-label bad">
              1
              <input form="form_main" name="health" value={1} type="radio" />
            </label>
            <label className="switch-label mod">
              2
              <input form="form_main" name="health" value={2} type="radio" />
            </label>
            <label className="switch-label good">
              3
              <input form="form_main" name="health" value={3} type="radio" />
            </label>
            <label className="switch-label good">
              4
              <input form="form_main" name="health" value={4} type="radio" />
            </label>
            <label className="switch-label great">
              5
              <input form="form_main" name="health" value={5} type="radio" />
            </label>
            <span className="text-lg">
            </span>
          </div>
        </section>
        <section className="my-6">
          <textarea
            name="note"
            form="form_main"
            id=""
            cols={30}
            className="w-full"
            placeholder="Some notes"
          >
          </textarea>
          <motion.button layoutId="fake" form="form_main" className="w-full">
            {loading ? "..." : "Submit"}
          </motion.button>
        </section>
      </motion.main>
    );
  } else if (state.ok === false) {
    console.log(state.error);

    return (
      <div>
        error
      </div>
    );
  } else {
    //TODO: handle ui
    return <div>UNHANDLED UI</div>;
  }
}
