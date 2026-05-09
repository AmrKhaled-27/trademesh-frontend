import React, { useState } from 'react';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Table } from '../../../components/Table';
import { Modal } from '../../../components/Modal';
import {
  useMyProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../../hooks/useProducts';
import { useCurrentUserQuery } from '../../../hooks/useUser';
import { uploadToCloudinary } from '../../../api/cloudinary';
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  History,
  ExternalLink,
  Loader2,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';

export const Inventory = () => {
  const { data: userData } = useCurrentUserQuery();
  const { data: productsData, isLoading, error } = useMyProductsQuery();

  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();
  const deleteMutation = useDeleteProductMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    mainImage: '',
    images: [],
  });

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        brand: product.brand || '',
        mainImage: product.mainImage || '',
        images: product.images || [],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        brand: '',
        mainImage: '',
        images: [],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, mainImage: url }));
    } catch (err) {
      console.error('Main upload failed:', err);
      alert('Failed to upload main image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdditionalImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      const uploadPromises = files.map((file) => uploadToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    } catch (err) {
      console.error('Gallery upload failed:', err);
      alert('Failed to upload some gallery images.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeAdditionalImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (editingProduct) {
      updateMutation.mutate(
        { id: editingProduct.id, data: payload },
        {
          onSuccess: closeModal,
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: closeModal,
      });
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm('Are you sure you want to delete this product? This action cannot be undone.')
    ) {
      deleteMutation.mutate(id);
    }
  };

  const products = productsData?.data?.products || [];
  const userId = userData?.data?.user?.id;

  const forSaleProducts = products.filter((p) => p.status === 'for_sale');
  const soldProducts = products.filter((p) => p.status === 'sold' && p.ownerId === userId);
  const boughtProducts = products.filter((p) => p.status === 'sold' && p.buyerId === userId);

  const forSaleColumns = [
    {
      key: 'image',
      label: 'Image',
      render: (p) => (
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container-high border border-surface-container-highest shadow-inner">
          <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover" />
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Product details',
      render: (p) => (
        <div className="flex flex-col">
          <span className="font-semibold text-on-surface">{p.name}</span>
          <span className="text-xs text-secondary">{p.brand}</span>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (p) => (
        <span className="font-display font-bold text-primary">${Number(p.price).toFixed(2)}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (p) => (
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => openModal(p)}
            className="p-2 text-secondary hover:text-primary transition-all hover:bg-primary/10 rounded-full cursor-pointer"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => handleDelete(p.id)}
            className="p-2 text-secondary hover:text-red-500 transition-all hover:bg-red-50 rounded-full cursor-pointer"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const logColumns = [
    {
      key: 'image',
      label: 'Image',
      render: (p) => (
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container-low border border-surface-container-high">
          <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover grayscale" />
        </div>
      ),
    },
    { key: 'name', label: 'Product' },
    {
      key: 'price',
      label: 'Amount',
      render: (p) => <span className="font-semibold">${Number(p.price).toFixed(2)}</span>,
    },
    {
      key: 'date',
      label: 'Status',
      render: () => (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-secondary uppercase tracking-widest bg-surface-container-high px-2 py-1 rounded">
          <CheckCircle2 size={12} />
          Completed
        </span>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <Typography variant="body-md" className="text-secondary animate-pulse">
          Loading your inventory...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-2xl border border-red-100 text-center">
        <Typography variant="h3" className="text-red-700 mb-2">
          Failed to load products
        </Typography>
        <Typography variant="body-md" className="text-red-600 mb-4">
          {error.message}
        </Typography>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-4">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <Typography variant="display-md" className="text-on-surface">
            Studio Inventory
          </Typography>
          <Typography variant="body-lg" className="text-secondary max-w-xl">
            Everything you need to manage your marketplace presence. Add new products, edit
            listings, and track your history.
          </Typography>
        </div>
        <Button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-8 py-4 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          <Plus size={20} strokeWidth={3} />
          Add Product
        </Button>
      </div>

      {/* Main Stats / Overview could go here */}

      {/* Active Listings Table */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Package size={24} />
          </div>
          <Typography variant="h2">Active Listings</Typography>
          <div className="ml-2 px-2 py-0.5 bg-surface-container-high text-secondary rounded text-xs font-bold">
            {forSaleProducts.length}
          </div>
        </div>
        <Table
          columns={forSaleColumns}
          data={forSaleProducts}
          emptyMessage="You don't have any products for sale at the moment."
        />
      </section>

      {/* History Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-surface-container-high">
        {/* Sold Products */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 text-green-700 rounded-lg">
              <CheckCircle2 size={24} />
            </div>
            <Typography variant="h3">Sold Products</Typography>
          </div>
          <Table columns={logColumns} data={soldProducts} emptyMessage="No products sold yet." />
        </section>

        {/* Bought Products */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <ShoppingBag size={24} />
            </div>
            <Typography variant="h3">Bought Products</Typography>
          </div>
          <Table columns={logColumns} data={boughtProducts} emptyMessage="No purchases found." />
        </section>
      </div>

      {/* Product Management Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProduct ? 'Edit Product Listing' : 'List New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Vintage Camera"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Brand / Manufacturer"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="e.g. Nikon"
                required
              />
              <Input
                label="Price ($)"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>

            {/* Images Selection Area */}
            <div className="space-y-6">
              {/* Main Image Upload Row */}
              <div className="flex flex-col space-y-2">
                <Typography variant="label" className="text-secondary">
                  Main Cover Image
                </Typography>
                <div className="relative group">
                  <input
                    type="file"
                    onChange={handleMainImageChange}
                    className="hidden"
                    id="main-image-upload"
                    accept="image/*"
                  />
                  <label
                    htmlFor="main-image-upload"
                    className={`flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed rounded-2xl transition-all cursor-pointer ${
                      formData.mainImage
                        ? 'border-primary/50 bg-primary/5 hover:bg-primary/10'
                        : 'border-surface-container-highest bg-surface-container-low hover:border-primary/30 hover:bg-surface-container'
                    }`}
                  >
                    {isUploading ? (
                      <Loader2 className="animate-spin text-primary" size={32} />
                    ) : formData.mainImage ? (
                      <div className="relative w-full h-[140px] p-2">
                        <img
                          src={formData.mainImage}
                          alt="Main Preview"
                          className="w-full h-full object-contain rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                          <span className="text-white text-sm font-bold bg-black/50 px-4 py-2 rounded-full">
                            Click to Change Cover
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-secondary p-6">
                        <div className="p-3 bg-surface-container-high rounded-full">
                          <Plus size={24} />
                        </div>
                        <Typography variant="body-md" className="font-semibold text-on-surface">
                          Upload Cover Image
                        </Typography>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Gallery Row */}
              <div className="flex flex-col space-y-3">
                <Typography variant="label" className="text-secondary">
                  Gallery Photos
                </Typography>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {/* Previews */}
                  {formData.images.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden border border-surface-container-high group shadow-sm"
                    >
                      <img
                        src={url}
                        alt={`Gallery ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(idx)}
                        className="absolute top-1 right-1 p-1.5 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer shadow-md"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Add Button as a Grid Item */}
                  <div className="relative aspect-square">
                    <input
                      type="file"
                      onChange={handleAdditionalImagesChange}
                      className="hidden"
                      id="additional-images-upload"
                      accept="image/*"
                      multiple
                    />
                    <label
                      htmlFor="additional-images-upload"
                      className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-surface-container-highest bg-surface-container-low hover:border-primary/30 hover:bg-surface-container rounded-xl transition-all cursor-pointer group"
                    >
                      {isUploading ? (
                        <Loader2 className="animate-spin text-primary" size={20} />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-secondary">
                          <Plus size={20} className="group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">
                            Add
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-secondary text-sm font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-surface-container-high px-4 py-3 rounded-xl outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface min-h-[120px] resize-none"
                placeholder="Tell buyers more about this item..."
                required
              />
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <Button variant="secondary" onClick={closeModal} className="flex-1 py-4">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 py-4"
              disabled={
                createMutation.isPending ||
                updateMutation.isPending ||
                isUploading ||
                !formData.mainImage
              }
            >
              {createMutation.isPending || updateMutation.isPending ? (
                <Loader2 className="animate-spin" size={24} />
              ) : editingProduct ? (
                'Save Changes'
              ) : (
                'Publish Listing'
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
