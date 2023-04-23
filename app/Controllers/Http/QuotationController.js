'use strict';

const Quotation = use('App/Models/Quotation');

class QuotationController {
    async index({ params }) {
        const quotations = await Quotation.query()
          .where('job_id', params.id)
          .fetch();
        return quotations;
    }

    async store({ request, response }) {
        try {
            // Create a new quotation in the database
            const data = request.only([
                'user_id',
                'job_id',
                'price',
                'comments'
            ]);
            const quotation = await Quotation.create(data);
            return response.status(201).json({ success: true, data: quotation });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error: 'Failed to create quotation' });
        }
    }
    
    async show({ params, request, response }) {
        try {
            // Fetch a specific quotation from database or external API
            const quotation = await Quotation.find(params.id);
            
            if (!quotation) {
                return response.status(404).json({ success: false, error: 'Quotation not found' });
            }
            
            return response.status(200).json({ success: true, data: quotation });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error: 'Failed to fetch quotation' });
        }
    }
    
    async update({ params, request, response }) {
        try {
            // Update a specific quotation in the database
            const quotation = await Quotation.find(params.id);
    
            if (!quotation) {
                return response.status(404).json({ success: false, error: 'Quotation not found' });
            }
    
            const data = request.only([
                'quotation_amount',
                'description'
            ]);
    
            quotation.merge(data);
            await quotation.save();
    
            return response.status(200).json({ success: true, data: quotation });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error: 'Failed to update quotation' });
        }
    }
    
    async destroy({ params, response }) {
        try {
            // Delete a specific quotation from the database
            const quotation = await Quotation.find(params.id);
    
            if (!quotation) {
                return response.status(404).json({ success: false, error: 'Quotation not found' });
            }
    
            await quotation.delete();
    
            return response.status(200).json({ success: true, message: 'Quotation deleted' });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error: 'Failed to delete quotation' });
        }
    }
}    

module.exports = QuotationController;
