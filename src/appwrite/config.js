import conf from "../conf/conf";
import { Databases,ID,Storage,Client,Query } from "appwrite";


export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }



    async createPost({title,slug,fetauredImage,content,status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    fetauredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("CreatePost Error",error)
        }

    }

    async updatePost(slug,{ title,content,status,fetauredImage }){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    fetauredImage
                }
            )


        } catch (error) {
            console.log("error in updatePost", error )
        }

    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("error in deletePost",error)
            return false
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("error in get id",error)
        }
    }
    async listPosts(queries = [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("error in listing data",error);
            return false
        }
    }



    // file upload services

    async fileUplaod(file){
        try {
            return await this.databases.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("error in uploading Files",error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true

        } catch (error) {
            console.log("error in deleting Files",error);
            return false
        }
    }

    getFilePerview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }

}




const service = new Service()
export default service