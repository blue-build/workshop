// some functional magic an AI wrote that i like 66.666...% understand
export const generateMatrix = (matrix: Record<string, Array<unknown>>) => {
    const entries: Array<[string, Array<unknown>]> = Object.entries(matrix);
    const differentValues: Array<Array<Record<string, unknown>>> = entries
        .map(([key, values]) => values.map((value) => ({ [key]: value })))
        .toReversed();
    // https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
    // @ts-expect-error i don't get it the type matches the result
    const cartesianProduct: Record<string, unknown>[][] = differentValues.reduce((a, b) =>
        // @ts-expect-error it's supposed to be an array of arrays, but TS doesn't know that
        a.flatMap((d) => b.map((e) => [d, e].flat()))
    );
    const allCombinations: Array<Record<string, unknown>> = cartesianProduct.map((a) =>
        Object.assign({}, ...a)
    );

    return allCombinations;
};
