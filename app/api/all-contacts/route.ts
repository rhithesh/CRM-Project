import db from "@/app/modules/db";

export async function POST(req: Request) {
  try {
    const obj = await req.json();
    
    

    if (!Array.isArray(obj.contacts)) {
        throw new Error('Contacts must be an array');
    }
    const contacts= obj.contacts.map((contact:any)=>{
        if (typeof contact !== 'object') {
            throw new Error('Each contact must be an object');
        }
        return { ...contact, lead_id: obj.lead_id };
    })
  
    const result = await db.allContacts.createMany({
        data: contacts
    })
    return Response.json({ data: result });
  } catch (error) {
    console.log("error", error);
  }
}
