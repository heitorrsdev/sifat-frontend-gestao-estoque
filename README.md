# Sistema de Gestão de Estoque e Faturamento - Sifat

## 📌 Sobre o Projeto
Single Page Application (SPA) desenvolvida como desafio técnico. O sistema permite o gerenciamento de estoque (CRUD de produtos) e a visualização de faturamento (vendas), garantindo uma interface rápida, responsiva e com feedback visual claro.

## 🏗️ Arquitetura e Decisões Técnicas

A documentação da API base (My JSON Server) especifica que operações de escrita (POST, PUT, DELETE) são simuladas, retornando status `200/201` sem alterar os dados permanentemente no servidor. 

Para garantir uma experiência de uso fluida e atender estritamente ao requisito de refletir as mudanças no Front-end de forma consistente, a aplicação adota a seguinte arquitetura:

* **In-Memory State Management (Single Source of Truth):** Após o *fetching* inicial da API, a aplicação assume o controle do estado global via Custom Hooks, evitando re-buscas (refetches) que sobrescreveriam os dados recém-inseridos com a base estática do servidor.
* **Mutação Otimista:** Operações de escrita efetuam a requisição HTTP e, mediante sucesso, atualizam o estado local em memória instantaneamente.
* **Processamento Client-Side Otimizado:** Toda a paginação, ordenação (ASC/DESC) e os filtros (busca unificada em múltiplas colunas) são processados no *client-side*. O uso rigoroso de `useMemo` garante que essas computações pesadas não causem re-renderizações desnecessárias.

## 🚀 Stack Tecnológica
* **Core:** React 18 + TypeScript (Strict Mode)
* **Build Tool:** Vite
* **Estilização:** Tailwind CSS v4
* **Formulários & Validação:** React Hook Form + Zod (Validação via Schema eliminando condicionais manuais)
* **Requisições:** Axios
* **UI/UX:** React-Toastify (Feedbacks) e Lucide React (Ícones SVG)

## ⚙️ Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/heitorrsdev/sifat-frontend-gestao-estoque.git
```

2. Instale as dependências:
```bash
pnpm install
```

3. Execute o projeto:
```bash
pnpm dev
```

4. Acesse o projeto:
```bash
http://localhost:5173
```
