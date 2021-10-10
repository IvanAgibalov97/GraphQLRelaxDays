import { ArticleModel } from "../../models/article";
import { UseCase } from "../../Common/UseCase";
import { TAddVariantInput } from "./TAddVariantInput";

export class AddVariantUseCase extends UseCase<TAddVariantInput, object> {
    public override handle(args: TAddVariantInput): object {
        return ArticleModel.findOneAndUpdate(
            { ean: args.variant.parent.ean },
            {
                $push: {
                    variants: {
                        characteristic: args.variant.characteristic,
                        createdBy: args.user,
                        createdAt: new Date(),
                        lastChangedBy: args.user,
                        lastChangedAt: new Date(),
                    },
                },
            },
            { new: true }
        ).then((res) => {
            return res;
        });
    }
    public override warningHandle(warningsArray: string[], query: string): void {
        if (query.indexOf("addVariant") != -1 && query.indexOf("user") == -1) {
            warningsArray.push("addVariant should be called with a user.");
        }
    }
}
