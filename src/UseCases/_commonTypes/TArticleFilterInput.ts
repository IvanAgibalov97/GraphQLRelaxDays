import { TCompleteInput } from "../../TInputs/TCompleteInput";
import { TComplexInputs } from "../../TInputs/TComplexInputs";
import { TDecimalInputs } from "../../TInputs/TDecimalInputs";
import { TStringInputs } from "../../TInputs/TStringInput";

export type TArticleFilterInput = TStringInputs & TDecimalInputs & TComplexInputs & TCompleteInput;
