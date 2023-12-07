import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"
import { theme } from "../themes/Theme";

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
        } else {
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
                            setEncerrado(false);
                        }
                    }
                ]);
        }

    }, [encerrado])

    useEffect(() => {

        const progress = (count + 1) * 100 / perguntas.length;
        console.log(`${(count + 1) * 100 / perguntas.length}%`)

    }, [count])

    return (
        <View style={styles.container}>
            <View style={[theme.header, styles.header]}>
                <Text style={styles.title}>{perguntas[count].titulo}</Text>
            </View>
            <View style={styles.center}>
                <View>
                    <TouchableOpacity
                        onPress={() => validarResposta("altA")}
                        style={styles.button}>
                        <Text style={styles.alternative}>A) {perguntas[count].altA}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => validarResposta("altB")}
                        style={styles.button}>
                        <Text style={styles.alternative}>B) {perguntas[count].altB}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => validarResposta("altC")}
                        style={styles.button}>
                        <Text style={styles.alternative}>C) {perguntas[count].altC}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.progressBar, { width: `${(count + 1) * 100 / perguntas.length}%` }]}>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'space-between'
    },
    button: {
        padding: 12,
        margin: 4
    },
    header: {
        justifyContent: 'center',
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        textAlign: 'left',
        fontFamily: 'Exo2Bold',
        paddingHorizontal: 12
    },
    alternative: {
        color: '#2C3E50',
        fontSize: 24,
        fontFamily: 'Exo2Regular'
    },
    progressBar: {
        backgroundColor: '#2C3E50',
        marginTop: 50,
        height: 16,
        width: '0%'
    }
})