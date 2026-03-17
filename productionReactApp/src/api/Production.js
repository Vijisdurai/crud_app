import axios from 'axios';

const API_URL = 'http://localhost:5160/api/productionline';

export async function getAllProductionLine() {
    try{
        const data = (await axios.get(API_URL)).data;
        return data;
    } catch (error) {
        console.error('Error fetching production lines data:', error);
        throw error;
    }
    
    
}

export  async function createProductionLine(productionLine) {
    try {
        const data = (await axios.post(API_URL, productionLine)).data;
        return data;
    } catch (error) {
        console.error('Error creating production line:', error);
        throw error;
    }
}