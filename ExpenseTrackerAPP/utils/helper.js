import { CATEGORIES as Category } from './CategoryJsonData';
// import { v4 as uniqueid } from 'uuid';

export const getId = () => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export const getDate = () => {
  return new Date().toISOString();
};

export const getCategoryColor = color => {
  const category = Category.find(cate => cate.color === color);
  return category ? category.color : 'gray'; // falback gray
};

export const processDataPieChart = expenses => {
  // Agar expenses empty ya invalid array ho chart data mat do
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return [];
  }

  //  Total spending nikaalo
  const totalSpending = expenses.reduce((sum, item) => sum + item.amount, 0);

  // Agar total spending 0 ho pie chart meaningless
  if (totalSpending === 0) {
    return [];
  }

  // Category wise amounts combine karo
  const spendingByCategory = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  // Har category ko pie chart format me convert karo
  const pieChartData = Object.keys(spendingByCategory).map(categoryName => {
    const amount = spendingByCategory[categoryName];
    const percentage = Math.round((amount / totalSpending) * 100);

    const categoryInfo = Category.find(cat => cat.name === categoryName) || {};

    return {
      name: categoryName,
      amount: amount,
      value: percentage,
      color: categoryInfo.color || '#808080',
      text: `${percentage}%`,
    };
  });

  return pieChartData;
};
