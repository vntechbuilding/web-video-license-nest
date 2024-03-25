export const BuildMenuTree = (
  menus: { parentId: string; id: string; children?: any[] }[],
  parentId: string = null,
): any[] => {
  const tree = [];
  let nodes = menus;

  if (parentId) {
    nodes = menus.filter((menu) => menu.parentId === parentId);
  }

  for (const node of nodes) {
    if (node.parentId === parentId) {
      const children = BuildMenuTree(menus, node.id);
      if (children.length) {
        node.children = children;
      }
      tree.push(node);
    }
  }

  return tree;
};
