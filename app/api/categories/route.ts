import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try{
        const categories = await db.category.findMany({
            orderBy: {name: "asc"},
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch data."}, {status: 500})
    }
}