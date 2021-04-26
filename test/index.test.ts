import index, * as allIndex from 'src';


describe("index exports", () => {
    it("default export should match snapshot", () => {
        expect(index).toMatchSnapshot()
    })

    it("all exports should match snapshot", () => {
        expect(allIndex).toMatchSnapshot()
    })
})