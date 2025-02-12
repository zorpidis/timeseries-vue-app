<template>
  <div class="modal-overlay" @click="closeModal">
    <div :class="['modal-content', modalType]" @click.stop>
      <h2>{{ modalTitle }}</h2>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
  props: {
  type: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  }
  },
  setup(props, { emit }) {
    const modalType = ref(props.type)

    const modalTitle = computed(() => {
      return props.type === 'success' ? 'Success' : 'Error';
    });
    

  watch(() => props.visible, (newVal) => {
    if (!newVal) {
      closeModal();
    }
  });

  const closeModal = () => {
    emit('update:isVisible', false)
  };

  

  return { modalType, closeModal, modalTitle }
  }

}


</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  align-items: flex-start;
  padding-top: 20px;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  color: #ddd;
  width: 15vw;
}

.modal-content.success {
  background: var(--color-modal-success-bg);
}

.modal-content.warning {
  background: var(--color-modal-warning-bg);
}

@media screen and (max-width: 1200px) {
  .modal-content {
    width: 300px;
  }
}
</style>