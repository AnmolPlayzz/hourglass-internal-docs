import fs from "fs";
import path from "path";
import Link from "next/link";
import SidebarLink from "@/components/sidebar/sidebar-link";

type SidebarNode = {
    name: string;
    path: string;
    children?: SidebarNode[];
};

function buildSidebarTree(dirPath: string, relativePath = "", isRoot = true): SidebarNode[] {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    let hasPage = false;
    const children: SidebarNode[] = [];

    for (const entry of entries) {
        const entryFullPath = path.join(dirPath, entry.name);
        const entryRelPath = path.join(relativePath, entry.name);

        if (entry.isDirectory()) {
            const childTree = buildSidebarTree(entryFullPath, entryRelPath, false);
            children.push(...childTree); // Flatten valid subfolders
        } else if (
            /^(page|layout)\.(mdx?|tsx?)$/.test(entry.name)
        ) {
            hasPage = true;
        }
    }

    if (hasPage || children.length > 0) {
        // If we're at root (`app/`), don't wrap the folder itself
        if (isRoot) {
            return children;
        }

        return [{
            name: path.basename(dirPath),
            path: relativePath.replace(/\\/g, "/"),
            children: children.length > 0 ? children : undefined,
        }];
    }

    return [];
}

export default function Sidebar() {
    const appDir = path.join(process.cwd(), "src/app");
    const tree = buildSidebarTree(appDir);
    console.log(tree)
    return (
        <aside style={{ width: "100%", padding: "1.4rem", height: "100vh", overflowY: "auto"}}>
            <SidebarItems nodes={tree} level={0} />
        </aside>
    );
}

function SidebarItems({ nodes, level }: { nodes: SidebarNode[]; level: number }) {
    return (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {nodes.map((node) => {
                const href = node.path === "" ? "/" : `/${node.path}`;
                return (
                    <li key={node.path}>
                        <SidebarLink href={href} node={node} level={level} />
                        {node.children && (
                            <SidebarItems nodes={node.children} level={level + 1} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
