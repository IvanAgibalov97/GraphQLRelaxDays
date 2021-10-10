describe("Update 6", () => {
    describe("new extensions", () => {
        it("deleteVariant returns warning");

        it("deleteVariantById id exists, parent exists");
        it("deleteVariantById id doesn't exist, parent exists");
        it("deleteVariantById id exists, parent doesn't exists");

        it("characteristic returns warning");

        it("characteristicDE is automatically created");
        it("addTranslation variant(id) exists");
        it("addTranslation variant(id) doesn't exist");
        it("addTranslation language doesn't exist");

        it("variant - translate automatically if language doesn't exist");
    });
    describe("old compatibilities", () => {
        it("addTranslation: variant, not characteristic");
        it("addTranslation: article, characteristic");
    });
    describe("check languages", () => {
        it("check English (EN)");
        it("check Arabic (AR)");
        it("check Chinese (ZH)");
        it("check Dutch (NL)");
        it("check Finnish (FI)");
        it("check French (FR)");
        it("check German(DE)");
        it("check Hindi (HI)");
        it("check Hungarian (HU)");
        it("check Indonesian (ID)");
        it("check Irish (GA)");
        it("check Italian (IT)");
        it("check Japanese (JA)");
        it("check Korean (KO)");
        it("check Polish (PL)");
        it("check Portuguese (PT)");
        it("check Russian (RU)");
        it("check Spanish (ES)");
        it("check Swedish (SV)");
        it("check Turkish (TR)");
        it("check Ukranian (UK)");
        it("check Vietnamese (VI)");
    });
});
