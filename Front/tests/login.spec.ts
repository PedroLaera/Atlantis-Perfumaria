import { test, expect } from '@playwright/test';

// --- Dados do Usuário em Constantes ---
const NOME_USUARIO = 'ivan vanco21';
const EMAIL_USUARIO = 'ivanvanco21@hotmail.com';
const SENHA_USUARIO = '12345678@';
const CPF_USUARIO = '324.826.240-02';

// Agrupando os testes relacionados em um "describe"
test.describe.serial('CRUD de Usuário', () => {

  // Teste 1: Focado apenas no registro
  // Este teste irá rodar primeiro, criando o usuário.
  test('deve registrar um novo usuário com sucesso', async ({ page }) => {
    await page.goto('http://localhost/register');

    await page.locator('input[name="name"]').fill(NOME_USUARIO); 
    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.locator('input[name="CPF"]').fill(CPF_USUARIO);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL('http://localhost/login'); 
  });

  // Teste 2: Focado apenas no login
  // Este teste rodará em segundo, agora com a garantia de que o usuário existe.
  test('deve fazer login com sucesso', async ({ page }) => {
    await page.goto('http://localhost/login'); 

    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.getByRole('button', { name: /entrar/i }).click();

    // Esta verificação agora deve passar.
    await expect(page).toHaveURL('http://localhost/profile'); 
  });

  // Teste 3: Focado apenas na exclusão (com seu próprio setup de login)
  test('deve apagar a conta após confirmação e alerta de sucesso', async ({ page }) => {
    // --- SETUP: Login do usuário ---
    // Este bloco garante que o teste começa no estado correto (logado).
    await page.goto('http://localhost/login');
    await page.locator('input[name="email"]').fill(EMAIL_USUARIO);
    await page.locator('input[name="password"]').fill(SENHA_USUARIO);
    await page.getByRole('button', { name: /entrar/i }).click();
  
    // Melhora 1: Espera explícita pela navegação para o perfil, em vez de forçá-la.
    await expect(page).toHaveURL('http://localhost/profile');
  
    // --- ARRANGE & ACT: Lidar com o diálogo de confirmação ---
    
    // Melhora 2: Usando Promise.all para executar a ação e esperar o diálogo simultaneamente.
    // Isso garante uma sincronização perfeita.
    const [firstDialog] = await Promise.all([
      page.waitForEvent('dialog'), // Começa a "escutar" pelo diálogo.
      page.getByTestId('botao-Excluir-Perfil').click() // Executa o clique que o dispara.
    ]);
  
    // --- ASSERT (do primeiro diálogo) ---
    expect(firstDialog.message()).toContain('Tem certeza que deseja apagar sua conta? Esta ação é irreversível');
  
    // --- ACT (do segundo diálogo) & ASSERT ---
    
    // Usamos o mesmo padrão Promise.all para o segundo diálogo.
    const [secondDialog] = await Promise.all([
      page.waitForEvent('dialog'), // Começa a "escutar" pelo segundo diálogo.
      firstDialog.accept() // Aceita o primeiro, o que dispara o segundo.
    ]);
    
    // Verifica a mensagem do segundo diálogo e o aceita.
    expect(secondDialog.message()).toBe('Conta apagada com sucesso.');
    await secondDialog.accept();
    
    // --- ASSERT FINAL: Verifica o estado final da aplicação ---
    await expect(page).toHaveURL('http://localhost/login');
  });
});