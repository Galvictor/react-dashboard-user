export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const getBadgeColor = (role) => {
  const colors = {
    admin: 'danger',
    professor: 'success',
    aluno: 'info',
  };
  return colors[role] || 'secondary';
};

export const handleApiError = (err) => {
  console.error('Erro na API:', err);
  return 'Erro ao carregar dados. Por favor, tente novamente.';
};