import { nonNull } from "./utils";

describe("nonNull", () => {
  it("should throw for falsy values", () => {
    const fns = [
      () => nonNull(null),
      () => nonNull(undefined),
      () => nonNull(false),
    ];

    fns.forEach((fn) => expect(fn).toThrow());
  });

  it("should not throw for truthy values", () => {
    expect(() => nonNull("foobar")).not.toThrow();
  });

  it("should return provided truthy value", () => {
    const obj = { foo: "bar" };

    const result = nonNull(obj);

    expect(result).toEqual({ foo: "bar" });
    expect(result).toBe(obj);
  });
});
