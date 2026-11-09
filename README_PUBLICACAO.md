# INSTEC — Site institucional 2.0

Site **100% frontend/estático** para o domínio `https://instec.eng.br`.

## O que está incluído

- `index.html` — página inicial
- `sobre.html` — história e dados institucionais
- `servicos.html` — áreas de atuação
- `projetos.html` — galeria com 23 fotografias do acervo histórico da Instel e filtros por categoria
- `contato.html` — contatos e formulário que prepara uma mensagem por e-mail
- `404.html` — página para endereços inexistentes
- `assets/css/site.css` — visual responsivo
- `assets/js/site.js` — menu móvel, galeria, filtros e formulário
- `assets/img/` — logo recebido e fotos otimizadas em WebP
- `favicon.svg`, `sitemap.xml`, `robots.txt` — recursos do navegador e mecanismos de busca

Não usa WordPress, PHP, MySQL, Node.js, bibliotecas externas, APIs, CDNs, cookies nem processamento no servidor.

## Como testar

1. Descompacte todo o ZIP em uma pasta.
2. Abra `index.html` no navegador.
3. Navegue pelas demais páginas. Mantenha a pasta `assets` e todos os arquivos na mesma estrutura.

Opcionalmente, para simular um servidor HTTP **somente durante desenvolvimento**:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. Na hospedagem definitiva, basta publicar os arquivos estáticos.

## Como publicar no domínio instec.eng.br

1. Contrate ou utilize qualquer hospedagem de arquivos estáticos que suporte HTTPS.
2. Envie o **conteúdo do ZIP**, incluindo `index.html` e a pasta `assets`, para a raiz pública do site.
3. Configure o DNS do domínio conforme as orientações da hospedagem e habilite o certificado HTTPS.
4. Teste todas as cinco páginas, principalmente navegação móvel e os links de contato.
5. Configure a página `404.html` como resposta 404 no painel do provedor, se houver esse recurso.

## Dados e contatos incluídos

- Razão social: INSTEC ENGENHARIA ELETRICA LTDA
- CNPJ: 68.241.691/0001-59
- Endereço: Rua Santos, 139 — Vila Nova, Novo Hamburgo/RS — CEP 93525-160
- Telefone fixo: (51) 3593-8466
- Celular / WhatsApp: (51) 98142-0071
- E-mail de orçamentos: `orcamentos@instec.eng.br`
- E-mail de compras: `compras@instec.eng.br`

**ATENÇÃO:** os dois endereços no domínio novo foram formados com os mesmos prefixos encontrados no site original (`orcamentos@` e `compras@`). **Eles não foram verificados como caixas postais existentes.** Antes de publicar, é preciso criá-los/configurá-los em um provedor de e-mail e ajustar MX, SPF, DKIM e, idealmente, DMARC no DNS, conforme a orientação do provedor. A simples publicação do site **não cria e-mails**.

A linha histórica de 1985 se refere à **Instel**; a constituição da pessoa jurídica **INSTEC** é de julho de 2026. Fotografias e clientes são identificados como parte do acervo **histórico da Instel**, não como contratos executados pela nova pessoa jurídica.

## Como funciona o formulário sem servidor

Ao preencher o formulário em `contato.html` e clicar em **Preparar e-mail de orçamento**, o JavaScript abre um link `mailto:` com destinatário, assunto e mensagem preenchidos. O visitante precisa confirmar o envio no programa de e-mail. Nenhum dado do formulário é transmitido ao site ou armazenado por ele.

Se o visitante não tiver um aplicativo de e-mail configurado, poderá usar os links de e-mail, telefone ou WhatsApp. **Não há envio automático**, pois isso exigiria serviço externo ou backend.

## Personalização

- Textos e URLs: edite diretamente os arquivos `.html`.
- Azul principal: modifique `--cyan` em `assets/css/site.css` (cor atual `#00B0F0`).
- Logo: `assets/img/instec-logo.png`, recortado da imagem fornecida, sem alteração na composição.
- Portfólio: altere os botões `.project-card` em `index.html` e `projetos.html`.
- Telefones/e-mails: atualize os links `tel:`, `mailto:` e `https://wa.me/` nos arquivos HTML.
- URLs institucionais: revise `sitemap.xml`, `<link rel="canonical">` e metatags caso mude o domínio ou nomes de páginas.

## Observação de direitos e autorização

As fotos vieram da cópia do site original fornecida pelo solicitante. Confirme a autorização para reutilizá-las comercialmente e eventuais créditos antes da publicação pública.
