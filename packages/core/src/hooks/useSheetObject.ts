import { ISheetObject, ISheet, UnknownShorthandCompoundProps } from "@theatre/core";
import { useEffect, useMemo, useState } from "react";

export default function useSheetObject<Props extends UnknownShorthandCompoundProps>(sheet: ISheet, name: string, props: Props) {
  const object = useMemo(() => {
    return sheet.object(name, props)
  }, [])

  return object
}