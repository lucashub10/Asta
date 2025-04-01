/**
 * Obtém os dados de pessoas do localStorage com tratamento de erro.
 * @returns {Array} O array de pessoas ou um array vazio.
 */

function calcularIdade(dataNascimento) {
    // Verifica se a data de nascimento foi fornecida
    if (!dataNascimento) {
        return "Inválida"; // Retorna "Inválida" se a data estiver vazia
    }
    try {
        // Obtém a data atual
        const hoje = new Date();
        // Cria um objeto Date para a data de nascimento
        const nascimento = new Date(dataNascimento + 'T00:00:00');

        // Verifica se a data de nascimento é válida
        if (isNaN(nascimento.getTime())) {
            return "Inválida"; // Retorna "Inválida" se a data não for reconhecida
        }

        // Calcula a diferença inicial em anos
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        // Calcula a diferença em meses
        const mes = hoje.getMonth() - nascimento.getMonth();

        // Ajusta a idade se o aniversário ainda não ocorreu este ano
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--; // Decrementa a idade
        }
        // Garante que a idade não seja negativa
        return idade >= 0 ? idade : 0;
    } catch (e) {
        // Captura e loga qualquer erro inesperado
        console.error("Erro ao calcular idade:", e);
        return "Erro"; // Retorna "Erro" em caso de exceção
    }
}


function getPessoasLocalStorage() {
    // Tenta obter a string JSON do localStorage
    const pessoasStr = localStorage.getItem("pessoas");
    // Retorna array vazio se não houver nada
    if (!pessoasStr) {
        return [];
    }
    try {
        // Tenta converter a string JSON para um array
        const pessoasArray = JSON.parse(pessoasStr);
        // Verifica se é um array e retorna, senão retorna array vazio
        return Array.isArray(pessoasArray) ? pessoasArray : [];
    } catch (e) {
        // Loga erros de conversão JSON
        console.error("Erro ao ler dados do localStorage:", e);
        // Retorna array vazio em caso de erro
        return [];
    }
}

/**
 * Salva o array de pessoas no localStorage.
 * @param {Array} pessoasArray - O array de objetos pessoa a ser salvo.
 */
function salvarPessoasLocalStorage(pessoasArray) {
    try {
        // Converte o array para string JSON
        const pessoasStr = JSON.stringify(pessoasArray);
        // Armazena no localStorage
        localStorage.setItem("pessoas", pessoasStr);
    } catch (e) {
        // Loga erros de conversão ou salvamento
        console.error("Erro ao salvar dados no localStorage:", e);
        // Alerta o usuário
        alert("Erro ao salvar os dados. Verifique o console.");
    }
}

// --- Funções de Validação e Formulário ---

/**
 * Valida os campos obrigatórios (ID, Nome, Data de Nascimento) e o formato da data.
 * @returns {boolean} True se o formulário for válido, False caso contrário.
 */
function validarFormulario() {
    // Obtém os valores dos campos
    const id = document.getElementById("id").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;

    // Verifica campos obrigatórios
    if (!id || !nome || !dataNascimento) {
        alert("Por favor, preencha os campos obrigatórios: ID, Nome Completo e Data de Nascimento.");
        return false;
    }

    // Verifica formato básico da data
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) {
        alert("Formato da Data de Nascimento inválido. Use AAAA-MM-DD.");
        return false;
    }

    // Verifica se a data é válida usando a função de calcular idade
    if (calcularIdade(dataNascimento) === "Inválida") {
        alert("Data de Nascimento inválida. Verifique o dia, mês e ano.");
        return false;
    }

    // Retorna verdadeiro se passou nas validações
    return true;
}

/**
 * Limpa todos os campos do formulário e reseta o estado do campo ID.
 */
function limparFormulario() {
    // Obtém referências aos elementos
    const form = document.getElementById("meuFormulario");
    const idInput = document.getElementById("id");
    const idadeInput = document.getElementById("idadeInput");

    // Reseta o formulário
    if (form) {
        form.reset();
    }
    // Garante que ID seja editável após limpar
    if (idInput) {
        idInput.readOnly = false;
    }
    // Limpa e mantém idade como readonly
    if (idadeInput) {
        idadeInput.value = '';
        idadeInput.readOnly = true;
    }
}
function salvar(){
    if (!validarFormulario){
        return;
    }
    const idinput =document.getElementById("id");//parabéns
    
    
}