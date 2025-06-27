import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/postItem";

dbConnect();

export async function GET(_request: Request, { params}: { params: { id: string}}) {
    try {
        const postItem = await PostItem.findById(params.id).select('-__v');
        return Response.json(postItem);
    } catch {
        return new Response(JSON.stringify({ message: 'Post item not found' }), {
            status: 404,
        })};
} 