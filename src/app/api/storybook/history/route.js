import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Storybook from "@/models/storybookModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
    try {
        const userId = getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const storybooks = await Storybook.find({ userId }).sort({ createdAt: -1 });

        return NextResponse.json({
            message: "Storybooks fetched successfully",
            data: storybooks
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
