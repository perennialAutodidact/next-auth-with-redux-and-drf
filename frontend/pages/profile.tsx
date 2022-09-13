import { httpClient, setHttpClientContext } from "common/api/httpClient"
import Layout from "common/components/Layout"
import { API_URL } from "common/constants"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import {AxiosResponse} from 'axios'
import {User} from 'ts/interfaces/auth'

const UserProfilePage:React.FC<UserProfilePageProps> = ({user}:UserProfilePageProps) => {
    return (
        <Layout>
            <div>
                {JSON.stringify(user)}
            </div>
        </Layout>
    )
}

export default UserProfilePage

interface FetchUserResponseData {
    user?: User;
    errors?: string[];
  }

interface UserProfilePageProps {
    user: User | null
}

export const getServerSideProps: GetServerSideProps = async(context: GetServerSidePropsContext) => {
    const {req,res} = context
    setHttpClientContext({req, res})

    try {
        const fetchUserResponse:AxiosResponse<FetchUserResponseData> = await httpClient.get(`${API_URL}/user/`)

        const {user} = fetchUserResponse.data
        return {
            props: {
                user
            }
        }
    } catch (error) {
        return {
            props: {
                user: null
            }
        }
    }

}