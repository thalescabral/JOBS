
export default {
    key: 'EDIFedex',
   
    async handle ({ data }) {
        const { user } = data;

       console.log(user);
    }

} 