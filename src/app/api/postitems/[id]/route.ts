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


export async function PUT(request: Request, { params }: { params: { id: string }}) {
    const updatedItem = await request.json();
    try {
        const postItem = await PostItem.findByIdAndUpdate(params.id, {
            ...updatedItem,
        });
        if (!postItem) {
            return new Response(JSON.stringify({ message: 'Post item not found' }), {
                status: 404,
            });
        };
        return new Response(JSON.stringify(postItem), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        })
    } catch {
        return new Response(JSON.stringify({ message: 'Error updating post item' }), {
            status: 500,
        });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const postItem = await PostItem.findByIdAndDelete(params.id);
        if (!postItem) {
            return new Response(JSON.stringify({ message: "Post not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            });
        }
        return new Response(JSON.stringify({ message: "Post deleted successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "SERVER ERROR" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}