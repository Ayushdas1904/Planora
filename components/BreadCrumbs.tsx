'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { usePathname } from "next/navigation"
import { Fragment } from "react";

function BreadCrumbs() {
    const path = usePathname();
    const segments = path.split("/").filter(Boolean);
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                    if (!segment) return null;

                    const isLast = index === segments.length - 1;

                    return (
                        <Fragment key={segment}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem key={segment}>
                                {isLast ? (
                                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={`/${segments.slice(0, index + 1).join("/")}`}>
                                        {segment}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}

            </BreadcrumbList>
        </Breadcrumb>

    )
}

export default BreadCrumbs
