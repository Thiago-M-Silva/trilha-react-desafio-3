import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, FazerLogin, Row, Wrapper } from './styles';
const Cadastro = () => {
    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors }} = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (FormData) => {
        try{
            const {data} = await api.get(`/users?email=${FormData.email}&senha=${FormData.senha}&senha=${FormData.nome}`);

            if(data.lenght && data[0].id){
                navigate('/feed')
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            return e.errors('Houve um erro')
        }//TODO verificar pq essa tela nao carregou
    };

    console.log('errors', errors);

    

    return(
        <>
            <Header />
            <Container>
                <Column>
                    <Title>
                        A plataforma para você aprender com experts, dominar as 
                        principais tecnologias e entrar mais rápido nas 
                        empresas mais desejadas.
                    </Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Comece agora grátis</TitleLogin>
                        <SubtitleLogin>Crie sua conta e make the change._ </SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Nome" leftIcon={<MdEmail />} name="nome" control={control} />
                            {errors.nome && <span>Nome é obrigatório</span>}
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input placeholder="senha" leftIcon={<MdEmail />} name="senha" control={control} />
                            {errors.senha && <span>Senha é obrigatória</span>}
                        </form>
                        <Row>
                            <p>
                                Ao clicar em "criar minha conta grátis", declaro que 
                                aceito as Políticas de Privacidade e os Termos de Uso 
                                da DIO.
                            </p>
                            <p>
                                Já tenho conta. <FazerLogin>Fazer login</FazerLogin>
                            </p>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    )
}

export { Cadastro }