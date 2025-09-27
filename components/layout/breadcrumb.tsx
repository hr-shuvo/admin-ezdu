"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "../ui/breadcrumb";
import { FC, Fragment } from "react";

interface BreadcrumbProps {
    basePath?: string; // optional, in case you want to ignore a prefix
    nameMap?: Record<string, string>; // optional mapping for prettier names
}

const Breadcrumbs: FC<BreadcrumbProps> = ({basePath = "/", nameMap = {}}) => {
    const pathname = usePathname(); // current path
    const segments = pathname.replace(basePath, "").split("/").filter(Boolean);

    const pathArray = segments.map((seg, idx) => {
        let name = "";

        if (nameMap[seg]) {
            name = nameMap[seg];
        } else if (seg === "form") {
            // Check if next segment exists and is numeric
            const nextSeg = segments[idx + 1];
            if (nextSeg && /^\d+$/.test(nextSeg)) {
                name = "Update";
            } else {
                name = "Create";
            }
        } else if (/^\d+$/.test(seg)) {
            // Skip numeric IDs in breadcrumb
            return null;
        } else {
            name = seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        }

        return {
            name,
            href: "/" + segments.slice(0, idx + 1).join("/"),
        };
    }).filter((item): item is { name: string; href: string } => !!item);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator/>

                {pathArray.map((segment, idx) => (

                    <Fragment key={idx}>
                        <BreadcrumbItem>
                            {idx === pathArray.length - 1 ? (
                                <span>{segment?.name}</span> // last breadcrumb not clickable
                            ) : (

                                <BreadcrumbLink asChild>
                                    <Link href={segment.href}>{segment.name}</Link>

                                </BreadcrumbLink>

                            )}
                        </BreadcrumbItem>

                        {
                            idx < pathArray.length -1 &&
                            <BreadcrumbSeparator/>
                        }

                    </Fragment>


                ))}
            </BreadcrumbList>


        </Breadcrumb>
    );
};

export default Breadcrumbs;
