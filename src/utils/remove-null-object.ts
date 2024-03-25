export const RemoveNullObject = (obj: any): any => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== ''),
  ) as any;
};
