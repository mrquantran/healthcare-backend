
/**
 * Convert 2 array, one with key, and one with value
 * @example
 * zip(['a','b'],['1','2']) ={ a:1, b:2 } 
 */
 function zip(arr1, arr2, result = {}) {
    arr1.forEach((key, i) => result[key] = arr2[i]);
    return result;
}

// key mapping in clinic table
const fieldsClinic = [
    "no",
    "name",
    "address",
    "district",
    "workHours",
    "city",
    "email"
]

const mappingClinicField  =(item )=>{
    if(!item){
        return 
    }
    const email = typeof item.email === 'object' && item.email.text !== null ? item.email.text : ''; 
    const district = item.district ? item.district.toString() : '';

    return {
        ...item,
        email: email,
        district:district
    }
}

export const mappingClinicData = (clinicData) => {
    // 1 field empty skip at first
    clinicData.splice(0, 1)
    const clinic = zip(fieldsClinic, clinicData)
    const mappingClinic = mappingClinicField(clinic)
   
    return mappingClinic;
};

