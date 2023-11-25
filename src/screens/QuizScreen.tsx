import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"

export const QuizScreen = () => {

    const [count, setCount] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [erros, setErros] = useState(0);
    const [encerrado, setEncerrado] = useState(false);

    const perguntas = [
        {
            "titulo": "O que é HTML?",
            "altA": "Hypertext Markup Language",
            "altB": "High-level Text Manipulation Language",
            "altC": "Hyperlink and Text Markup Language",
            "altCorreta": "altA"
        },
        {
            "titulo": "Qual linguagem de programação é mais associada à criação de páginas web dinâmicas?",
            "altA": "Java",
            "altB": "Python",
            "altC": "JavaScript",
            "altCorreta": "altC"
        },
        {
            "titulo": "O que significa CSS?",
            "altA": "Counter Style Sheet",
            "altB": "Computer Style Sheet",
            "altC": "Cascading Style Sheet",
            "altCorreta": "altC"
        },
        {
            "titulo": "Qual é a função do comando 'git clone' no Git?",
            "altA": "Criar um novo repositório",
            "altB": "Copiar um repositório remoto para o computador local",
            "altC": "Adicionar arquivos ao repositório",
            "altCorreta": "altB"
        },
        {
            "titulo": "O que é um servidor HTTP?",
            "altA": "Um software que processa dados em um banco de dados",
            "altB": "Um computador que armazena sites da web",
            "altC": "Um protocolo de comunicação para transferência de arquivos",
            "altCorreta": "altB"
        },
        {
            "titulo": "Qual é a diferença entre 'let' e 'const' no JavaScript?",
            "altA": "Nenhuma diferença, são sinônimos",
            "altB": "let é usado para variáveis mutáveis, const é usado para variáveis imutáveis",
            "altC": "const é usado para variáveis mutáveis, let é usado para variáveis imutáveis",
            "altCorreta": "altB"
        },
        {
            "titulo": "O que é uma API?",
            "altA": "Application Programming Interface",
            "altB": "Advanced Programming Interface",
            "altC": "Automated Programming Interface",
            "altCorreta": "altA"
        },
        {
            "titulo": "Qual é a função do comando 'npm install' no Node.js?",
            "altA": "Iniciar um novo projeto Node.js",
            "altB": "Instalar dependências do projeto",
            "altC": "Remover o Node.js do sistema",
            "altCorreta": "altB"
        },
        {
            "titulo": "O que é um loop 'for' em programação?",
            "altA": "Uma estrutura condicional",
            "altB": "Um tipo de dado",
            "altC": "Uma estrutura de repetição",
            "altCorreta": "altC"
        },
        {
            "titulo": "Qual é a principal função do Docker?",
            "altA": "Desenvolver interfaces de usuário",
            "altB": "Isolar e empacotar aplicações com suas dependências",
            "altC": "Conectar servidores remotamente",
            "altCorreta": "altB"
        }
    ];

    const validarResposta = (value: string) => {
        if (value === perguntas[count].altCorreta) {
            setAcertos(prevState => prevState + 1);
            alert('CERTO');
        } else {
            setErros(prevState => prevState + 1);
            alert('NÀO ACREDITO, Você é burro, burro, burro...');
        }

        if (count + 1 < perguntas.length) {
            setCount(count + 1);
        }else{
            setEncerrado(true);
        }
    }

    useEffect(() => {

        if (encerrado) {
            Alert.alert('Questionário encerrado', `Total de acertos: ${acertos}\nTotal de erros: ${erros}`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setAcertos(0);
                            setErros(0);
                            setCount(0);
                        }
                    }
                ]);
        }

    }, [encerrado])

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.title}>{perguntas[count].titulo}</Text>

            <TouchableOpacity
                onPress={() => validarResposta("altA")}
                style={style.button}>
                <Text style={style.alternative}>A) {perguntas[count].altA}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => validarResposta("altB")}
                style={style.button}>
                <Text style={style.alternative}>B) {perguntas[count].altB}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => validarResposta("altC")}
                style={style.button}>
                <Text style={style.alternative}>C) {perguntas[count].altC}</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 12,
        margin: 4
    },
    title: {
        color: '#2C3E50',
        fontSize: 30,
        fontFamily: 'Exo2Bold',
        marginBottom: 12
    },
    alternative: {
        color: '#2C3E50',
        fontSize: 24,
        fontFamily: 'Exo2Regular'
    }
})