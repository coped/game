export const nonNull = <T,>(item: T | null | undefined | false): T => {
  if (!item)
    throw new Error("Expected provided item to be truthy, but was falsy.");
  return item;
};