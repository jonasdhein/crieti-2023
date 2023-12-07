import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatMoney = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

export const formatDate = (date: string) => {
    return format(parseISO(date), 'dd/MM/yyyy HH:mm', {
        locale: ptBR
    });
}

export const formatDateShort = (date: string) => {
    return format(parseISO(date), 'dd/MM', {
        locale: ptBR
    });
}

