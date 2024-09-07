<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVectorAssetsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'description' => ['required', 'max:1000'],
            'category_id' => ['required', 'exists:vector_categories,id'],
            'file' => ['nullable', 'file', 'mimes:svg,png,jpg,jpeg', 'max:2048'], // opsional jika tidak mengubah file
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}
