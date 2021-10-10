import { ArticleModel } from "../../models/article";
import { UseCase } from "../../Common/UseCase";
import { TDeleteVariantInput } from "./TDeleteVariantInput";

export class DeleteVariantUseCase extends UseCase<TDeleteVariantInput, object> {
    public override handle(args: TDeleteVariantInput): object {
        return ArticleModel.findOneAndUpdate(
            {
                ean: args.variant.parent.ean,
                variants: {
                    $elemMatch: { characteristic: args.variant.characteristic },
                },
            },
            {
                $pull: {
                    variants: {
                        characteristic: args.variant.characteristic,
                    },
                },
                $set: {
                    lastChangedBy: args.user,
                    lastChangedAt: new Date(),
                },
            },
            { new: true }
        ).then((res) => {
            if (res == null) {
                throw new Error("no article with given ean and characteristic");
            }
            return res;
        });
    }
    public override warningHandle(warningsArray: string[], query: string): void {
        if (query.indexOf("deleteVariant") != -1 && query.indexOf("user") == -1) {
            warningsArray.push("deleteVariant should be called with a user.");
        }
    }
}
