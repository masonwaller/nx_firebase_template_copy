import { getDataById, createData } from "@nx-template/firebase";


export const getUser
    = async (req, res) => {
        const { userId } = req.params;
        const user = await getDataById({
            collection: 'users',
            docId: userId,
        });
        res.status(200).send(user);
    }

export const createUser
    = async (req, res) => {
        const userData = req.body;
        const user = await createData({
            collection: 'users',
            params: userData,
        });
        res.status(200).send(user);
    }