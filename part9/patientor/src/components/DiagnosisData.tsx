import { useEffect, useState } from "react";
import diagnosisService from "../services/diagnoses";
import { Diagnosis } from "../types";

type Props = {
  code: string;
};

function DiagnosisData({ code }: Props) {
  const [diagnosis, setDiagnosis] = useState<Diagnosis>({} as Diagnosis);

  useEffect(() => {
    diagnosisService.getOne(code).then((diagnosis) => {
      setDiagnosis(diagnosis);
    });
  }, [code]);

  return (
    <li>
      {diagnosis.code} {diagnosis.name}
    </li>
  );
}

export default DiagnosisData;
