import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/stripe-js/react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export function usePaymentMethods(patientId) {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // 获取支付方法列表
    const fetchPaymentMethods = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/patients/${patientId}/payment-methods`);
            const data = await response.json();
            setPaymentMethods(data);
        } catch (error) {
            console.error('Error fetching payment methods:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 添加新的支付方法
    const addPaymentMethod = async (cardElement) => {
        try {
            const stripe = await stripePromise;
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                throw error;
            }

            const response = await fetch(`/api/patients/${patientId}/payment-methods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save payment method');
            }

            await fetchPaymentMethods();
        } catch (error) {
            console.error('Error adding payment method:', error);
            throw error;
        }
    };

    // 删除支付方法
    const deletePaymentMethod = async (paymentMethodId) => {
        try {
            const response = await fetch(`/api/patients/${patientId}/payment-methods/${paymentMethodId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete payment method');
            }

            await fetchPaymentMethods();
        } catch (error) {
            console.error('Error deleting payment method:', error);
            throw error;
        }
    };

    return {
        paymentMethods,
        isLoading,
        fetchPaymentMethods,
        addPaymentMethod,
        deletePaymentMethod,
    };
} 