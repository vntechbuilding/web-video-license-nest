export const BuildMenuTree = (
  menus: { parentId: string; id: string; children?: any[] }[],
  parentId: string = null,
  level: number = 1,
): any[] => {
  const tree = [];
  let nodes = menus;

  if (parentId) {
    nodes = menus.filter((menu) => menu.parentId === parentId);
  }

  for (const node of nodes) {
    if (node.parentId === parentId) {
      const children = BuildMenuTree(menus, node.id, level + 1);
      if (children.length) {
        node.children = children;
      }
      tree.push({ ...node, level });
    }
  }

  return tree;
};
