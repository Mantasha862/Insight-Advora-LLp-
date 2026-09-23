import { startTransition, type FormEvent } from "react";

/**
 * React 19 resets uncontrolled forms after a `<form action>` completes, which would wipe
 * user input when validation fails. Submitting through a transition keeps field values.
 */
export function submitWithoutReset(dispatch: (fd: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter);
    startTransition(() => dispatch(fd));
  };
}
