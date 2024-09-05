// app/api/items/route.js
import { NextResponse } from "next/server";

let items = [];

export async function GET() {
  return NextResponse.json(items);
}

export async function POST(request) {
  const { name } = await request.json();
  const newItem = { id: Date.now(), name };
  items.push(newItem);
  return NextResponse.json(newItem);
}

export async function PUT(request) {
  const { id, name } = await request.json();
  items = items.map((item) => (item.id === id ? { ...item, name } : item));
  return NextResponse.json({ id, name });
}

export async function DELETE(request) {
  const { id } = await request.json();
  items = items.filter((item) => item.id !== id);
  return NextResponse.json({ id });
}
