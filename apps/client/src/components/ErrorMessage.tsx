import { memo } from "react";
type IError = {
  error?: string;
};

function ErrorMessage({ error }: IError) {
  if (!error) return;
  return <p className="text-destructive mb-2 text-sm">{error}</p>;
}

export default memo(ErrorMessage);
