import * as Minio from 'minio';

import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {


    const minioClient = new Minio.Client({
      endPoint: '127.0.0.1', 
      port: 9000,
      useSSL: false, 
      accessKey: 'minioadmin', 
      secretKey: 'minioadmin',
    });

    const buckets = await minioClient.listBuckets()
    console.log(buckets)
    return NextResponse.json(buckets, { status: 200 });

  } catch (error) {
    console.error("Error fetching", error);
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}