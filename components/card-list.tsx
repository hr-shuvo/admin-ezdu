'use client';

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const popularContent = [
    {
        "id": 1,
        "title": "Image Generation with AI",
        "badge": "AI",
        "image": "https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg",
        "count": 120
    },
    {
        "id": 2,
        "title": "Web Development Basics",
        "badge": "Web",
        "image": "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
        "count": 95
    },
    {
        "id": 3,
        "title": "Data Science with Python",
        "badge": "Data",
        "image": "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
        "count": 210
    },
    {
        "id": 4,
        "title": "Cloud Computing Essentials",
        "badge": "Cloud",
        "image": "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
        "count": 80
    },
    {
        "id": 8,
        "title": "Mobile App Development",
        "badge": "Mobile",
        "image": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
        "count": 130
    },
];

const latestTransaction =[

    {
        "id": 6,
        "title": "UI/UX Design Principles",
        "badge": "Design",
        "image": "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
        "count": 70
    },
    {
        "id": 7,
        "title": "Cybersecurity Fundamentals",
        "badge": "Security",
        "image": "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg",
        "count": 65
    },
    {
        "id": 8,
        "title": "Mobile App Development",
        "badge": "Mobile",
        "image": "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
        "count": 130
    },
    {
        "id": 9,
        "title": "Blockchain & Web3",
        "badge": "Blockchain",
        "image": "https://images.pexels.com/photos/6771586/pexels-photo-6771586.jpeg",
        "count": 55
    },
    {
        "id": 10,
        "title": "Big Data Analytics",
        "badge": "Data",
        "image": "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
        "count": 115
    },
];


const CardList = ({title}: { title: string }) => {
    const list = title === "Popular Content" ? popularContent : latestTransaction;

    return (
        <div className="">
            <h1 className="text-lg font-medium mb-6">{title}</h1>

            <div className="flex flex-col gap-2">
                {
                    list.map((item, index) => (
                        <Card key={index} className='flex-row items-center justify-between gap-4 p-4'>
                            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                            </div>
                            <CardContent className='p-0 flex-1'>
                                <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
                                <Badge variant="secondary">Badge</Badge>
                            </CardContent>
                            <CardFooter className='p-0'>{item.count/1000}K</CardFooter>
                        </Card>
                    ))
                }
            </div>

        </div>
    )

}

export default CardList;