import pkg from '@prisma/client';
import createHttpError from 'http-errors';
import exportDataFromExcel from '../../service/excelJS.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const uploadMechanism = async (req,res) => {
    try {
        const { base64String } = req.body

        if (!base64String) {
            return res.status(404).json({ message: "ko nhan dc" });
        }

        var buffer = Buffer.from(base64String, 'base64'); // binary
        const data = await exportDataFromExcel(buffer)
    
        data.forEach(async (item) => {
           
           
            const createMany = await prisma.clinic.create({
                data: item,
              }).then(()=>{
                  console.log(22)
              }).catch((err)=>{
                  console.log(err)
              })
        })
       

        // do not create clinic yet.
        return res.json({data :data, success:true })
    }  catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // 500 (Internal Server Error) - Something has gone wrong in your application.
        const httpError = createHttpError(500, error);
        return res.status(500).json({ message: httpError });
    }
}

const createClinic = async (req, res) => {
    try {
        const { id, name, address, district, workHours, city, email } = req.body
    
        const data = await prisma.clinic.create({
            data: {
                id:     id,
                name:   name,
                address:    address,
                district:   district,
                workHours:  workHours,
                city:       city,
                email:      email
            }
        })
        return res.status(200).json({message: 'Create clinic successfully'})
    } catch (error) {
        console.log(error);
        
    }
}

export const clinics = {
   uploadMechanism
}




